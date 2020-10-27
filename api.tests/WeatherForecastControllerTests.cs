using System;
using Xunit;
using API.Controllers;
using System.Collections.Generic;

namespace API.Tests
{
    public class WeatherForecastControllerTests
    {
        [Fact]
        public void Get_ReturnsIEnumerableOfWeatherForecast()
        {
            //Arrange
            var controller = new WeatherForecastController();

            //Act
            var result = controller.Get();

            //Assert
            Assert.IsAssignableFrom<IEnumerable<WeatherForecast>>(result);
        }
    }
}
