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
            //Racuns = new HashSet<Racun>();
        }

        public int ValutaId { get; set; }
        public string Oznaka { get; set; }
        public decimal? Tecaj { get; set; }
        //public bool? Obrisan { get; set; }

        //public virtual ICollection<Racun> Racuns { get; set; }
    }
}
