
# User Management App

A full-stack application using Laravel 8 (API) and React 17 + TypeScript (frontend) to manage users and roles.

## Features
- Create users with full name, email, and multiple roles (Author, Editor, Subscriber, Administrator)
- View users grouped by role
- Validation for required fields and unique email
- React frontend with hooks, axios, and react-router-dom

## Backend Setup (Laravel)
1. **Clone the repository**
2. **Install dependencies:**
	```bash
	composer install
	```
3. **Copy .env file:**
	```bash
	cp .env.example .env
	```
4. **Set your database credentials in `.env`:**
	- `DB_DATABASE=your_db_name`
	- `DB_USERNAME=your_db_user`
	- `DB_PASSWORD=your_db_password`
5. **Generate app key:**
	```bash
	php artisan key:generate
	```
6. **Run migrations and seed roles:**
	```bash
	php artisan migrate
	php artisan db:seed --class=RolesTableSeeder
	```
7. **Start Laravel server:**
	```bash
	php artisan serve
	```
	The API will be available at `http://127.0.0.1:8000`.

## Frontend Setup (React)
1. **Navigate to frontend folder:**
	```bash
	cd react-frontend
	```
2. **Install dependencies:**
	```bash
	npm install
	```
3. **Start React app:**
	```bash
	npm start
	```
	The app will run at `http://localhost:3000`.

## API Endpoints
- `POST /api/users` — Create user
- `GET /api/users` — List users grouped by role

## Notes
- Make sure both servers (Laravel and React) are running for full functionality.
- If you change backend port, update API URLs in React code.
- For CORS issues, ensure Laravel's `cors` config allows requests from React's port.

---

**Enjoy building and testing!**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[OP.GG](https://op.gg)**
- **[WebReinvent](https://webreinvent.com/?utm_source=laravel&utm_medium=github&utm_campaign=patreon-sponsors)**
- **[Lendio](https://lendio.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
