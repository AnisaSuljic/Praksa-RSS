using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model.Requests
{
    public class KlijentInsertUpdate
    {
        public string Naziv { get; set; }
        public string Adresa { get; set; }
        public string Mjesto { get; set; }
        public string Pdvbroj { get; set; }
        public string Idbroj { get; set; }
        public string Telefon { get; set; }
        public string OdgovornaOsoba { get; set; }
        public string Email { get; set; }
        public string BrojBankovnogRacuna { get; set; }
        public byte[] Image { get; set; }
    }
}

