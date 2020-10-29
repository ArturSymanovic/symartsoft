using System;
using Xunit;
using API.Controllers;
using System.Collections.Generic;
using Autofac.Extras.Moq;

namespace API.Tests
{
    public class WeatherForecastControllerTests
    {
        [Fact]
        public void Get_ReturnsIEnumerableOfWeatherForecast()
        {
            
            using (var mock = AutoMock.GetLoose())
            {
            //Arrange
            mock.Mock<ITestDependancy>();
                //.Setup(x => x.GetData<string>("test connection string"))
                //.Returns(GetListOfstrings());
            var controller = mock.Create<WeatherForecastController>();

            //Act
            var result = controller.Get();

            //Assert
            Assert.IsAssignableFrom<IEnumerable<WeatherForecast>>(result);                
            }
        }

        private List<string> GetListOfstrings()
        {
            return new List<string> 
            {
                "a", "b", "c"
            };
        }

        [Fact]
        public void Get_TestingMoq()
        {
            using (var mock = AutoMock.GetLoose())
            {
            //Arrange
            mock.Mock<ITestDependancy>()
                .Setup(x => x.GetData<string>("test connection string"))
                .Returns(GetListOfstrings());
            var controller = mock.Create<WeatherForecastController>();

            //Act
            var result = controller.GetArray();

            //Assert
            Assert.Equal<string>(GetListOfstrings(), result);
            }
        }
    }
}
