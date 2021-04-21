using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IDokumentService : ICRUDService<Faktura.Model.Dokument,object,Faktura.Model.Requests.DokumentInsertDelete, Faktura.Model.Requests.DokumentInsertDelete>
    {
    }
}
