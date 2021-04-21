using Faktura.Model;
using Faktura.Model.Requests;
using Microsoft.AspNetCore.Mvc;
using RSS_backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KlijentController : BaseCRUDController<Faktura.Model.Klijent, Faktura.Model.KlijentSearch,
         Faktura.Model.Requests.KlijentInsertUpdate, Faktura.Model.Requests.KlijentInsertUpdate>
    {
        public KlijentController(IKlijentService service) : base(service)
        {
        }
    }
}
