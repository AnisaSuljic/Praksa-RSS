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
    public class KupacController : BaseCRUDController<Faktura.Model.Kupac, object,
        Faktura.Model.Requests.KupacInsertUpdate, Faktura.Model.Requests.KupacInsertUpdate>
    {

        public KupacController(IKupacService service) : base(service)
        {
        }
       
    }
}
