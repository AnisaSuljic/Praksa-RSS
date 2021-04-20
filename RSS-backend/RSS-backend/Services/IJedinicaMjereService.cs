using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Services
{
    public interface IJedinicaMjereService:ICRUDService<Faktura.Model.JedinicaMjere,Faktura.Model.JedinicaMjereSearch,
        Faktura.Model.Requests.JedinicaMjereInsert, Faktura.Model.Requests.JedinicaMjereUpdate>
    {
        //List<Faktura.Model.JedinicaMjere> Get();
        //Faktura.Model.JedinicaMjere GetByID(int id);
        //Faktura.Model.JedinicaMjere Insert(Faktura.Model.Requests.JedinicaMjereInsert request);
    }
}
