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
    public class ArtiklController : BaseCRUDController<Faktura.Model.Artikl, object,
        Faktura.Model.Requests.ArtiklInsertUpdate, Faktura.Model.Requests.ArtiklInsertUpdate>
    {

        public ArtiklController(IArtiklService service) : base(service)
        {
        }
       
    }
}
