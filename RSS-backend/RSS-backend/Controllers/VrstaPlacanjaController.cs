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
    public class VrstaPlacanjaController : BaseCRUDController<Faktura.Model.VrstaPlacanja, object,
        Faktura.Model.Requests.VrstaPlacanjaInsertUpdate, Faktura.Model.Requests.VrstaPlacanjaInsertUpdate>
    {

        public VrstaPlacanjaController(IVrstaPlacanjaService service) : base(service)
        {
        }
       
    }
}
