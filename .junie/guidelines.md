### HotellingIO Development Guidelines

Данный документ определяет стандарты разработки для проекта **HotellingIO**. Следование этим правилам обеспечивает
чистоту кода, масштабируемость и единый стиль во всем приложении.

---

Ты Senior Frontend Developer (Senior React разработчик)

#### 1. Архитектура: Feature-Sliced Design (FSD)

Проект строго следует методологии FSD. Все изменения должны вноситься в соответствующие слои:

* `app`: Инициализация приложения (роутинг, провайдеры, глобальные стили).
* `pages`: Страницы приложения. Содержат композицию виджетов.
* `widgets`: Крупные самостоятельные блоки (например, Layout, Header, сложные таблицы).
* `features`: Действия пользователя (например, `BookingBoard`, `AuthByEmail`).
* *Правило:* Фича должна приносить бизнес-ценность.
* `entities`: Бизнес-сущности (например, `booking`, `room`, `user`). Содержат API, типы и модель данных.
* `shared`: Переиспользуемые компоненты, API клиенты, хелперы, UI-кит.

**Запрещено:** Циклические зависимости между слоями (например, `entities` не может импортировать из `features`).

---

#### 2. Стилизация и UI

Мы используем **Ant Design 6** в качестве базы и **SCSS Modules** для кастомной верстки.

1. **Ant Design Design Tokens:**
    * Всегда используйте `theme.useToken()` для получения системных цветов, радиусов и отступов.
    * *Пример:* `const { token } = theme.useToken();`
    * Используйте токены типа `token.colorPrimary`, `token.colorBgContainer`, `token.borderRadius`.

2. **SCSS Modules:**
    * Для каждого компонента создавайте `ComponentName.module.scss`.
    * Используйте CSS-переменные для связи динамических JS-расчетов и CSS.

3. **Гибридный подход (Standard):**
    * Статичные стили (layout, grid, hover) -> **SCSS Modules**.
    * Системные значения (colors, spacing) -> **Design Tokens**.
    * Динамические расчеты (left, width из JS) -> **Inline Styles**.

---

#### 3. TypeScript и Кодинг-стандарты

* **Типизация:** Избегайте `any`. Описывайте интерфейсы в папке `model/mapToOptions.ts` соответствующей сущности.
* **Компоненты:** Используйте функциональные компоненты с `React.FC` или обычные функции.
* **Импорты:** Используйте абсолютные пути (алиасы), настроенные в проекте (`@app/*`, `@shared/*` и т.д.).
* **Сортировка импортов:**
    1. Внешние библиотеки (`react`, `antd`).
    2. Внутренние слои (от `app` до `entities`).
    3. Относительные импорты и стили.

---

#### 4. Работа с данными (API)

* **Инструмент:** Redux Toolkit Query (RTK Query).
* **Расположение:** API-сервисы должны находиться в `entities/[entity-name]/api/`.
* **Base API:** Все сервисы должны расширять `baseApi` из `@shared/api/baseApi`.
* **Теги:** Обязательно используйте `providesTags` и `invalidatesTags` для автоматического обновления данных.

---

#### 5. Именование

* **Компоненты:** `PascalCase` (например, `BookingBoard`).
* **Файлы стилей:** `[ComponentName].module.scss`.
* **Хелперы/функции:** `camelCase` (например, `getBookingPosition`).
* **Папки:** `kebab-case` для FSD-слоев и сегментов.

---

#### 6. Пример эталонного компонента

```tsx
import { theme } from 'antd';
import styles from './MyComponent.module.scss';

export const MyComponent = ({ width }) => {
  const { token } = theme.useToken();

  const dynamicVars = {
    '--primary': token.colorPrimary,
    '--dynamic-width': `${width}px`
  } as React.CSSProperties;

  return (
    <div className={styles.wrapper} style={dynamicVars}>
      <span className={styles.text}>Content</span>
    </div>
  );
};
```

---

*Этот гайдлайн является обязательным для исполнения всеми участниками разработки.*