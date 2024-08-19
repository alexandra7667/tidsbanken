using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using System.Threading.Tasks;
using Backend.Payloads;
using Backend.DTOs;
using System.Security.Claims;

namespace Backend.Controllers
{
    public static class VacationRequestApi
    {
        public static void ConfigureVacationRequestApi(this WebApplication app)
        {
            var requestGroup = app.MapGroup("request");
            requestGroup.MapGet("/", getAllRequests);
            requestGroup.MapPost("/", createRequest);
            requestGroup.MapGet("/{requestId}", getRequestById);
            requestGroup.MapPatch("/{requestId}", updateRequest);
            requestGroup.MapDelete("/{requestId}", deleteRequest);
        }

        public static async Task<IResult> getAllRequests([FromServices] IVacationRequestRepository requestRepository)
        {
            IEnumerable<VacationRequest>? requests = await requestRepository.GetAllRequests();

            if (requests == null)
            {
                return TypedResults.NotFound("Requests not found.");
            }

            //Turn list of model objects into list of DTOs
            List<VacationRequestDTO> vacationRequestDTOs = requests.Select(vacationRequest => new VacationRequestDTO(vacationRequest)).ToList();

            return TypedResults.Ok(vacationRequestDTOs);
        }

        public static async Task<IResult> createRequest([FromServices] IVacationRequestRepository requestRepository, [FromBody] AddVacationRequestPayload request)
        {
            // Add logic to create a vacation request
            await requestRepository.AddRequest(request);
            return TypedResults.Ok("Request created successfully.");
        }

        public static async Task<IResult> getRequestById([FromServices] IVacationRequestRepository requestRepository, int requestId)
        {
            VacationRequest? request = await requestRepository.GetRequestById(requestId);

            if (request == null)
            {
                return TypedResults.NotFound("Request not found.");
            }

            VacationRequestDTO vacationRequestDTO = new VacationRequestDTO(request); 

            return TypedResults.Ok(vacationRequestDTO);
        }

        public static async Task<IResult> updateRequest([FromServices] IVacationRequestRepository requestRepository, [FromBody] UpdateRequestPayload payload, int requestId, ClaimsPrincipal user)
        {
            //Status update can only be done by administrator
            if (payload.Approved != false) {
                string userRole = user.FindFirst(ClaimTypes.Role)?.Value;

                if (userRole != "ADMIN")
                {
                    return TypedResults.Unauthorized();
                }

                bool isApproved = await requestRepository.ApproveRequest(payload, requestId);

                if (isApproved == null)
                {
                    return TypedResults.NotFound("Request not found or approval failed.");
                }

                //When a request is successfully moderated by an administrator, the moderator and the time of moderation should be recorded on the request object

                return TypedResults.Ok(payload.Approved ? "The request was approved" : "The request was denied");
            }

            //The request owner may only make updates to the request before the request has been moderated by an administrator.
            await requestRepository.UpdateRequest(payload, requestId);

            return TypedResults.Ok("The request was updated");
        }

        public static async Task<IResult> deleteRequest([FromServices] IVacationRequestRepository requestRepository, int requestId, ClaimsPrincipal user)
        {
            //Can only be done by administrator
            string userRole = user.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole != "ADMIN")
            {
                return TypedResults.Unauthorized();
            }

            await requestRepository.DeleteRequest(requestId);

            //Should be cascading (delete comments)

            return TypedResults.Ok("The request was deleted");
        }
    }
}
