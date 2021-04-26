using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Faktura.Model
{
    public class Grupa
    {
        public Grupa()
        {
        }

        public int GrupaId { get; set; }
        public string Naziv { get; set; }
        public int? VrstaId { get; set; }
        public int? KlijentId { get; set; }
        public int? PorezId { get; set; }
    }
}
