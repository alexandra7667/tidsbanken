using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using System.Threading.Tasks;
using Backend.Payloads;
namespace Backend.Controllers
{
    public static class VacationRequestApi
    {
        public static void ConfigureVacationRequestApi(this WebApplication app)
        {
            var requestGroup = app.MapGroup("request");
            requestGroup.MapPost("/create", createRequest);
            requestGroup.MapGet("/", getRequests);
            requestGroup.MapGet("/{id}", getRequestById);
            requestGroup.MapPut("/{id}/approve", approveRequest);
            requestGroup.MapDelete("/{id}/approve", approveRequest);
        }

        public static async Task<IResult> createRequest([FromServices] IVacationRequestRepository requestRepository, [FromBody] AddVacationRequestPayload request)
        {
            // Add logic to create a vacation request
            await requestRepository.AddRequest(request);
            return TypedResults.Ok("Request created successfully.");
        }

        public static async Task<IResult> getRequestById([FromServices] IVacationRequestRepository requestRepository, int id)
        {
            VacationRequest? request = await requestRepository.GetRequestById(id);

            if (request == null)
            {
                return TypedResults.NotFound("Request not found.");
            }

            VacationRequestDTO vacationRequestDTO = new VacationRequestDTO(request); 

            return TypedResults.Ok(vacationRequestDTO);
        }

        public static async Task<IResult> getRequests([FromServices] IVacationRequestRepository requestRepository)
        {
            IEnumerable<VacationRequest>? requests = await requestRepository.GetAllRequests();

            if (requests == null)
            {
                return TypedResults.NotFound("Requests not found.");
            }

            //Turn list of model objects into list of DTOs
            List<VacationRequestDTO> vacationRequestDTOs = requests.Select(vacationRequest => new VacationRequest(vacationRequest)).ToList();

            return TypedResults.Ok(vacationRequestDTOs);
        }

        public static async Task<IResult> approveRequest([FromServices] IVacationRequestRepository requestRepository, int id)
        {
            // Add logic to approve a vacation request
            bool isApproved = await requestRepository.ApproveRequest(id);
            if (!isApproved)
            {
                return TypedResults.NotFound("Request not found or approval failed.");
            }

            return TypedResults.Ok("Request approved.");
        }
    }
}
