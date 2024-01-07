using SignalRExample2.DTO;
using Microsoft.AspNetCore.SignalR;

namespace SignalRExample2.Hubs
{
    public sealed class UserHub : Hub
    {
        private readonly Random _random = new Random();
        ////private IUserControl<UserHub> control = null;


        //private IUserControl control;

        public UserHub()
        {
           // control = ctrl;
        }

        public async void StartUserUpdates()
        {
            int i = 0;
            while(true)
            {
                UserDTO user =  GenerateRandomUser(i);
                await Clients.All.SendAsync("ReceiveUser", user);
                Console.WriteLine(i);
                i++;
                await Task.Delay(5000);
            }
        }

        private  UserDTO GenerateRandomUser(int userId)
        {
            return new UserDTO
            {
                Id = userId,
                FirstName = "User" + userId.ToString(),
                LastName = "User" + userId.ToString(),
                Age = _random.Next(18, 60),
                Occupation = "Occupation" + _random.Next(0, 100),
                Status = "Active"
            };
        }
    }
}
