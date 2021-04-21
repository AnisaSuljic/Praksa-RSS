using Faktura.Model;
using Faktura.Model.Requests;
using Microsoft.AspNetCore.Mvc;
using RSS_backend.Database;
using RSS_backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StavkeController : BaseCRUDController<Faktura.Model.Stavke, object,
        Faktura.Model.Requests.StavkeInsertUpdate, Faktura.Model.Requests.StavkeInsertUpdate>
    {

        public StavkeController(IStavkeService service) : base(service)
        {
        }
       
    }
}
