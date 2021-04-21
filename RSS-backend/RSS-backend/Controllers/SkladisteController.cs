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
    public class SkladisteController : BaseCRUDController<Faktura.Model.Skladiste, object,
        Faktura.Model.Requests.SkladisteInsertUpdate, Faktura.Model.Requests.SkladisteInsertUpdate>
    {

        public SkladisteController(ISkladisteService service) : base(service)
        {
        }
       
    }
}
