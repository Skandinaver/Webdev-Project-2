namespace Webdev___Project_2.Models
{
    public class RegResponse
    {
        public bool IsSuccessfulRegistration { get; set; }
        public IEnumerable<string>? Errors { get; set; }
    }
}

