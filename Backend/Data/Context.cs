using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                 .HasIndex(u => u.Name)
                 .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Id)
                .IsUnique();


            modelBuilder.Entity<VacationRequest>()
                .HasOne(vr => vr.User)
                .WithMany(u => u.VacationRequests)
                .HasForeignKey(vr => vr.UserId)
                .IsRequired();


            modelBuilder.Entity<Comment>()
                .HasOne(c => c.VacationRequest)
                .WithMany(vr => vr.Comments)
                .HasForeignKey(c => c.VacationRequestId)
                .IsRequired();

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .IsRequired();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<VacationRequest> VacationRequests { get; set; }
        public DbSet<Comment> Comments { get; set; }

    }
}