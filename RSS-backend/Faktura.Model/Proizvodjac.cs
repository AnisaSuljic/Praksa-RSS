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
        }

        public int ProizvodjacId { get; set; }
        public string Naziv { get; set; }
        public int? KlijentId { get; set; }
    }
}
