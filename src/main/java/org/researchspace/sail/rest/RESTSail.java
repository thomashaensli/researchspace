/**
 * ResearchSpace
 * Copyright (C) 2021, © Trustees of the British Museum
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package org.researchspace.sail.rest;

import org.eclipse.rdf4j.sail.SailConnection;
import org.eclipse.rdf4j.sail.SailException;

/**
 * 
 * @author Janmaruko Hōrensō <@gspinaci>
 *
 */

public class RESTSail extends AbstractServiceWrappingSail {

    public RESTSail(String url) {
        super(url);
    }

    @Override
    protected SailConnection getConnectionInternal() throws SailException {
        
        // read input/output data from descriptor and save in the instance
        initParameters();

        return new RESTSailConnection(this);
    }    
}
