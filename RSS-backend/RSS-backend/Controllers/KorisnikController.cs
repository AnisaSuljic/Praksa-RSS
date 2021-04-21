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
    public class KorisnikController : BaseCRUDController<Faktura.Model.Korisnik, Faktura.Model.KorisnikSearch,
        Faktura.Model.Requests.KorisnikInsertUpdate, Faktura.Model.Requests.KorisnikInsertUpdate>
    {

        public KorisnikController(IKorisnikService service) : base(service)
        {
        }
       
    }
}
