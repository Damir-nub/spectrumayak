import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Go to home page
    await page.goto("http://localhost:3004");
  });

  function generateTestEmail() {
    return `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;
  }

  const testPassword = "testpass123";

  test("1. Public pages accessible without auth", async ({ page }) => {
    // Test home page
    await expect(page).toHaveTitle(/СпектраМаяк/);

    // Test register page
    await page.goto("http://localhost:3004/register");
    await expect(page.locator('input[name="email"]')).toBeVisible();

    // Test login page
    await page.goto("http://localhost:3004/login");
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test("2. Dashboard redirects to login when not authenticated", async ({
    page,
  }) => {
    await page.goto("http://localhost:3004/dashboard");

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test("3. Complete registration flow", async ({ page }) => {
    const testEmail = generateTestEmail();

    // Go to register page
    await page.goto("http://localhost:3004/register");

    // Fill registration form
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to login with success message
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("text=Регистрация успешна")).toBeVisible();
  });

  test("4. Registration validation", async ({ page }) => {
    const testEmail = generateTestEmail();

    await page.goto("http://localhost:3004/register");

    // Test short password
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', "short");
    await page.fill('input[name="confirmPassword"]', "short");

    await page.click('button[type="submit"]');

    // Should show error
    await expect(
      page.locator("text=Пароль должен содержать минимум 8 символов"),
    ).toBeVisible();
  });

  test("5. Registration password mismatch", async ({ page }) => {
    const testEmail = generateTestEmail();

    await page.goto("http://localhost:3004/register");

    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', "different");

    await page.click('button[type="submit"]');

    // Should show error
    await expect(page.locator("text=Пароли не совпадают")).toBeVisible();
  });

  test("6. Complete login flow", async ({ page }) => {
    const testEmail = generateTestEmail();

    // First register a user
    await page.goto("http://localhost:3004/register");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);
    await page.click('button[type="submit"]');

    // Wait for redirect to login
    await expect(page).toHaveURL(/\/login/);

    // Fill login form
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });

    // Should show user email
    await expect(page.locator(`text=${testEmail}`)).toBeVisible();
  });

  test("7. Login with invalid credentials", async ({ page }) => {
    await page.goto("http://localhost:3004/login");

    await page.fill('input[name="email"]', "nonexistent@example.com");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    // Should show error
    await expect(page.locator("text=Неверный email или пароль")).toBeVisible();
  });

  test("8. Dashboard accessible after login", async ({ page }) => {
    const testEmail = generateTestEmail();

    // Register and login
    await page.goto("http://localhost:3004/register");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/login/);

    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard/);

    // Verify dashboard elements
    await expect(
      page.locator("text=Добро пожаловать в СпектраМаяк"),
    ).toBeVisible();
    await expect(page.locator("text=Тариф:")).toBeVisible();
    await expect(page.locator("text=Бесплатный")).toBeVisible();
  });

  test("9. Logout flow", async ({ page }) => {
    const testEmail = generateTestEmail();

    // Register and login
    await page.goto("http://localhost:3004/register");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/login/);

    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard/);

    // Logout
    await page.click('button:has-text("Выйти")');

    // Should redirect to home
    await expect(page).toHaveURL("http://localhost:3004/");

    // Try to access dashboard - should redirect to login
    await page.goto("http://localhost:3004/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("10. Protected routes behavior", async ({ page }) => {
    const testEmail = generateTestEmail();

    // Register and login
    await page.goto("http://localhost:3004/register");
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/login/);

    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/dashboard/);

    // Try to access login while authenticated - should redirect to dashboard
    await page.goto("http://localhost:3004/login");
    await expect(page).toHaveURL(/\/dashboard/);

    // Try to access register while authenticated - should redirect to dashboard
    await page.goto("http://localhost:3004/register");
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
