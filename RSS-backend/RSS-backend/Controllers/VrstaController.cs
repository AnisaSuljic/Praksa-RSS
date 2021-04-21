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
    public class VrstaController : BaseCRUDController<Faktura.Model.Vrsta, object,
         Faktura.Model.Requests.VrstaInsertUpdate, Faktura.Model.Requests.VrstaInsertUpdate>
    {
        public VrstaController(IVrstaService service) : base(service)
        {
        }
    }
}
