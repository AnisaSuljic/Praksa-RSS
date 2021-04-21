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
    public class DokumentController : BaseCRUDController<Faktura.Model.Dokument, object,
        Faktura.Model.Requests.DokumentInsertDelete, Faktura.Model.Requests.DokumentInsertDelete>
    {

        public DokumentController(IDokumentService service) : base(service)
        {
        }
       
    }
}
