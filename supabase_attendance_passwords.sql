create table if not exists attendance_passwords (
  id uuid primary key default gen_random_uuid(),
  password text not null unique,
  status text not null default 'reserved',
  whatsapp_message text,
  payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table attendance_passwords enable row level security;

create index if not exists attendance_passwords_created_at_idx
  on attendance_passwords (created_at desc);

create or replace function set_attendance_passwords_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists attendance_passwords_set_updated_at on attendance_passwords;

create trigger attendance_passwords_set_updated_at
before update on attendance_passwords
for each row
execute function set_attendance_passwords_updated_at();
