import { z } from "zod";

/**
 * Schema for validating building creation/update data
 */
export const buildingSchema = z.object({
  name: z
    .string()
    .min(1, "Building name is required")
    .max(100, "Building name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .nullable()
    .optional(),
  logoUrl: z.string().url("Logo URL must be a valid URL").nullable().optional(),
  address: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .nullable()
    .optional(),
});

/**
 * Type definition based on the building schema
 */
export type BuildingFormData = z.infer<typeof buildingSchema>;

/**
 * Validates building data against the schema
 * @param data - The building data to validate
 * @returns Object with validation result and optional error message
 */
export function validateBuildingData(data: any): {
  valid: boolean;
  errors?: Record<string, string[]>;
} {
  try {
    buildingSchema.parse(data);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};

      error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });

      return {
        valid: false,
        errors,
      };
    }

    return {
      valid: false,
      errors: { _: ["Unknown validation error"] },
    };
  }
}
