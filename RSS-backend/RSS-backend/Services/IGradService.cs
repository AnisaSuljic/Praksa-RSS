using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IGradService : ICRUDService<Faktura.Model.Grad,object,Faktura.Model.Requests.GradInsertUpdate, Faktura.Model.Requests.GradInsertUpdate>
    {
    }
}
