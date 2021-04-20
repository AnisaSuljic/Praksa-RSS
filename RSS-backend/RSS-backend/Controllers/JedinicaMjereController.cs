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
    public class JedinicaMjereController : BaseCRUDController<Faktura.Model.JedinicaMjere, Faktura.Model.JedinicaMjereSearch,
        Faktura.Model.Requests.JedinicaMjereInsert, Faktura.Model.Requests.JedinicaMjereUpdate>
    {

        public JedinicaMjereController(IJedinicaMjereService service) : base(service)
        {
        }
       
    }
}
