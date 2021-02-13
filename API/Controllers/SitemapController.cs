using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]")]
    public class SitemapController: Controller
    {
        public ActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Sitemap.txt"), "text/plain");
        }
    }
}