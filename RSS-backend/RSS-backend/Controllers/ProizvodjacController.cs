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
    public class ProizvodjacController : BaseCRUDController<Faktura.Model.Proizvodjac, object,
        Faktura.Model.Requests.ProizvodjacInsertUpdate, Faktura.Model.Requests.ProizvodjacInsertUpdate>
    {

        public ProizvodjacController(IProizvodjacService service) : base(service)
        {
        }
       
    }
}
