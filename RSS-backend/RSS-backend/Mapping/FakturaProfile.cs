using AutoMapper;
using RSS_backend.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Mapping
{
    public class FakturaProfile:Profile
    {
        public FakturaProfile()
        {
            //jedinica mjere
            CreateMap<Database.JedinicaMjere, Faktura.Model.JedinicaMjere>();
            CreateMap<Faktura.Model.Requests.JedinicaMjereInsert, JedinicaMjere>();
            CreateMap<Faktura.Model.Requests.JedinicaMjereUpdate, JedinicaMjere>();

            //klijent
            CreateMap<Database.Klijent, Faktura.Model.Klijent>();
            CreateMap<Faktura.Model.Requests.KlijentInsertUpdate, Klijent>();//ako bude bio potreban insert/update novi model//
        }
    }
}
