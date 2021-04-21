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
    public class GradController : BaseCRUDController<Faktura.Model.Grad, object,
        Faktura.Model.Requests.GradInsertUpdate, Faktura.Model.Requests.GradInsertUpdate>
    {

        public GradController(IGradService service) : base(service)
        {
        }
       
    }
}
