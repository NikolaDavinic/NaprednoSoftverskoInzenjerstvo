using SignalRExample2.DTO;

namespace SignalRExample2.Hubs
{
    public interface IUserHub
    {
        Task ReceiveUser(UserDTO user);
        Task GenerateNewUser();

    }
}
