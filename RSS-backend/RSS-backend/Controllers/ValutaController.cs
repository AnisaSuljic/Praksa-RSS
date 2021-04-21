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
    public class ValutaController : BaseCRUDController<Faktura.Model.Valuta, object,
        Faktura.Model.Requests.ValutaInsertUpdate, Faktura.Model.Requests.ValutaInsertUpdate>
    {

        public ValutaController(IValutaService service) : base(service)
        {
        }
       
    }
}
