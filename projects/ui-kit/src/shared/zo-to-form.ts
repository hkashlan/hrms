/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZodNullable, ZodNumber, ZodObject, ZodOptional, ZodString } from 'zod';

export function zodToAngularForm(schema: ZodObject<any>): FormGroup {
  const controls: Record<string, FormControl> = {};

  // function isZodOptional(x: ZodTypeDef): x is ZodOptionalDef {
  //   return 'typeName' in x && x.typeName === ZodFirstPartyTypeKind.ZodOptional;
  // }
  // function isZodNullable(x: ZodTypeDef): x is ZodOptionalDef {
  //   return 'typeName' in x && x.typeName === ZodFirstPartyTypeKind.ZodNullable;
  // }
  Object.entries(schema.shape).forEach(([key, zodField]) => {
    if (key === 'id') {
      return;
    }
    const validators = [];
    let isOptional = false;
    let isNullable = false;

    // Handle optional fields
    if (zodField instanceof ZodOptional) {
      isOptional = true;
      zodField = zodField._def.innerType; // Extract the inner type
    }

    // Handle nullable fields
    if (zodField instanceof ZodNullable) {
      isNullable = true;
      zodField = zodField._def.innerType; // Extract the inner type
    }

    // Process the actual field type
    if (zodField instanceof ZodString) {
      if (zodField.isEmail) validators.push(Validators.email);
      if (zodField.minLength) validators.push(Validators.minLength(zodField.minLength));
      if (zodField.maxLength) validators.push(Validators.maxLength(zodField.maxLength));
    }

    if (zodField instanceof ZodNumber) {
      if (zodField.isInt) validators.push(Validators.pattern(/^\d+$/));
      if (zodField.minValue !== undefined) validators.push(Validators.min(zodField.minValue!));
      if (zodField.maxValue !== undefined) validators.push(Validators.max(zodField.maxValue!));
    }

    if (!isNullable) {
      validators.push(Validators.required);
    }

    controls[key] = new FormControl('', { validators, nonNullable: isNullable });
  });

  return new FormGroup(controls);
}
