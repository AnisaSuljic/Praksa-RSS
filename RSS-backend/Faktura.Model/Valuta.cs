using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model
{
    public class Valuta
    {
        public Valuta()
        {
        }

        public int ValutaId { get; set; }
        public string Oznaka { get; set; }
        public decimal? Tecaj { get; set; }
    }
}
