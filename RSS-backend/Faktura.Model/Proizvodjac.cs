using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model
{
    public class Proizvodjac
    {
        public Proizvodjac()
        {
            //Artikls = new HashSet<Artikl>();
        }

        public int ProizvodjacId { get; set; }
        public string Naziv { get; set; }
        public int? KlijentId { get; set; }
        //public bool? Obrisan { get; set; }

        //public virtual Klijent Klijent { get; set; }
        //public virtual ICollection<Artikl> Artikls { get; set; }
    }
}
