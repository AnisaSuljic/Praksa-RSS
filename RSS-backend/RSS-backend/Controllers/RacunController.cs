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
    public class RacunController : BaseCRUDController<Faktura.Model.Racun, object,
        Faktura.Model.Requests.RacunInsertUpdate, Faktura.Model.Requests.RacunInsertUpdate>
    {

        public RacunController(IRacunService service) : base(service)
        {
        }
       
    }
}
