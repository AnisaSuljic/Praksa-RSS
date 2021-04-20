using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSS_backend.Filters
{
    public class UserException:Exception
    {
        public UserException(string message) : base(message)
        {

        }
    }
}
