using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model.Requests
{
    public class ArtiklInsertUpdate
    {
        public string Sifra { get; set; }
        public string Naziv { get; set; }
        public int? GrupaId { get; set; }
        public string KataloskiBroj { get; set; }
        public int? Fisbroj { get; set; }
        public decimal? Nc { get; set; }
        public decimal? Marza { get; set; }
        public decimal? MarzaIznos { get; set; }
        public decimal? Vpc { get; set; }
        //public decimal? Mpc { get; set; } racuna se automatski
        public int? ProizvodjacId { get; set; }
        public int? KlijentId { get; set; }
        public int? JedinicaMjereId { get; set; }
        public decimal? CijenaHh { get; set; }
        public decimal? MinKolNaSkladistu { get; set; }
        public string Opis { get; set; }
    }
}
