import "hyper-express";
import type { UserStructure } from ".";

declare module "hyper-express" {
    interface Request {
        user?: UserStructure;
    }
}
