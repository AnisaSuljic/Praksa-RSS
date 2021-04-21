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
    public class GrupaController : BaseCRUDController<Faktura.Model.Grupa, object,
        Faktura.Model.Requests.GrupaInsertUpdate, Faktura.Model.Requests.GrupaInsertUpdate>
    {

        public GrupaController(IGrupaService service) : base(service)
        {
        }
       
    }
}
