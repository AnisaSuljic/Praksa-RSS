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
    public class PorezController : BaseCRUDController<Faktura.Model.Porez, object,
        Faktura.Model.Requests.PorezInsertUpdate, Faktura.Model.Requests.PorezInsertUpdate>
    {

        public PorezController(IPorezService service) : base(service)
        {
        }
       
    }
}
