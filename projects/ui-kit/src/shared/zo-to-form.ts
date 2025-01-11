/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZodBoolean, ZodNumber, ZodObject, ZodOptional, ZodString } from 'zod';

export function zodToAngularForm(schema: ZodObject<any>): FormGroup {
  const controls: Record<string, FormControl> = {};

  Object.entries(schema.shape).forEach(([key, zodType]) => {
    const validators = [];

    if (zodType instanceof ZodString) {
      if (zodType._def.checks) {
        zodType._def.checks.forEach((check) => {
          if (check.kind === 'min') {
            validators.push(Validators.minLength(check.value));
          } else if (check.kind === 'max') {
            validators.push(Validators.maxLength(check.value));
          } else if (check.kind === 'email') {
            validators.push(Validators.email);
          }
        });
      }
    } else if (zodType instanceof ZodNumber) {
      if (zodType._def.checks) {
        zodType._def.checks.forEach((check) => {
          if (check.kind === 'min') {
            validators.push(Validators.min(check.value));
          } else if (check.kind === 'max') {
            validators.push(Validators.max(check.value));
          }
        });
      }
    } else if (zodType instanceof ZodBoolean) {
      // No additional validators for booleans.
    } else if (zodType instanceof ZodOptional) {
      // Handle optional fields.
      validators.push(Validators.nullValidator);
    }

    controls[key] = new FormControl('', validators);
  });

  return new FormGroup(controls);
}
