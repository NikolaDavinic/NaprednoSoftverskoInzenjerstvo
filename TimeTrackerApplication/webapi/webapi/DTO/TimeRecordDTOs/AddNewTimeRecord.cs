using System.ComponentModel.DataAnnotations;
using webapi.Models;

namespace webapi.DTO.TimeRecordDTOs
{
    public class AddNewTimeRecord
    {
        public int Id { get; set; }

        public string? Description { get; set; }

        public DateTime DateOfRecord { get; set; }

        public int RecordingTime { get; set; }
    }
}
