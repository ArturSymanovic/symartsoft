using System;
using System.Collections.Generic;

namespace API
{
    public class WeatherForecast
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }

    public interface ITestDependancy
    {
        List<T> GetData<T>(string connectionString);
    }
}
