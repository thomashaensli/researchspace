/**
 * ResearchSpace
 * Copyright (C) 2020, © Trustees of the British Museum
 * Copyright (C) 2015-2019, metaphacts GmbH
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

import { EventMaker } from 'platform/api/events';
import { CompositeValue } from './FieldValues';

export interface FormEventData {
  // triggers
  /**
   * If the post-action='event' for SemanticFormComponent, Component fires this event after a
   * new form is submitted
   */
  'Form.ResourceCreated': { iri: string };
  /**
   * If the post-action='event' for SemanticFormComponent.
   * Component fires this event on each update of the form including creation
   */
  'Form.ResourceUpdated': { iri: string };

  /**
   * semantic-form fires this event when resource is removed
   */
  'Form.ResourceRemoved': { iri: string };

  /**
   *
   */
  'Form.CurrentValue': { value: CompositeValue };

  // listens
  /**
   * Triggers remove resource action, iri needs to match current subject.
   */
  'Form.RemoveResource': { iri: string };

  /**
   *
   */
  'Form.GetValue': {};
}
const event: EventMaker<FormEventData> = EventMaker;

export const FormResourceCreated = event('Form.ResourceCreated');
export const FormResourceUpdated = event('Form.ResourceUpdated');
export const FormResourceRemoved = event('Form.ResourceRemoved');
export const FormCurrentValue = event('Form.CurrentValue');

export const FormRemoveResource = event('Form.RemoveResource');
export const FormGetValue = event('Form.GetValue');
