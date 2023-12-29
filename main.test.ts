import ClerkExists from "./actions/profile/clerk-exists";
import CreateProfile from "./actions/profile/create-profile";
import DeleteProfile from "./actions/profile/delete-profile";
import UpdateProfile from "./actions/profile/update-profile";

import { ProfileValidator } from "./actions/validators";

describe("Validators", () => {
  describe("Profile", () => {
    describe("Username", () => {
      test("Valid", () => {
        expect(
          ProfileValidator.safeParse({
            username: "test",
          }).success
        ).toBe(true);
      });
      test("Invalid", () => {
        expect(
          ProfileValidator.safeParse({
            username: "$",
          }).success
        ).toBe(false);
      });
    });
    describe("About me", () => {
      test("Too long", () => {
        expect(
          ProfileValidator.safeParse({
            username: "test",
            aboutme: "A".repeat(401),
          }).success
        ).toBe(false);
      });
    });
    describe("Linkvertise", () => {
      test("Valid", () => {
        expect(
          ProfileValidator.safeParse({
            username: "test",
            linkvertise_api: "12345",
          }).success
        ).toBe(true);
      });
      test("Invalid", () => {
        expect(
          ProfileValidator.safeParse({
            username: "test",
            linkvertise_api: "abc",
          }).success
        ).toBe(false);
      });
    });
    describe("Work.Ink", () => {
      test("Valid UUID", () => {
        expect(
          ProfileValidator.safeParse({
            username: "test",
            workink_api: "0d7a4588-3d70-4f7e-806b-55ebef2c1b41",
          }).success
        ).toBe(true);
      });
      test("Invalid UUID", () => {
        expect(
          ProfileValidator.safeParse({
            username: "test",
            workink_api: "non-uuid",
          }).success
        ).toBe(false);
      });
    });
  });
});

describe("Profile", () => {
  test("Delete", async () => {
    await DeleteProfile("demo_clerk");
  });

  test("Create", async () => {
    await CreateProfile("demo_clerk");
  });

  test("Exists", async () => {
    const Exists = await ClerkExists("demo_clerk");
    expect(Exists).toBe(true);
  });

  test("Update", async () => {
    await UpdateProfile("demo_clerk", "clerk");
  });
});
