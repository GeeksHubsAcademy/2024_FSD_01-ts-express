USE fsd_library_online;

-- crear roles en la db
insert into roles (id, name) values (1, 'user');
insert into roles (id, name) values (2, 'admin');
insert into roles (id, name) values (3, 'super_admin');

-- crear usuarios en el sistema
insert into users (id, name, email, password, role_id) values (1, 'user', 'user@user.com', '$08$KCoyc.QU7xbzX2pe31zIxOaeyZGDMUF9YqtbWAaKZsEZWmw2j9l4K', 1);
insert into users (id, name, email, password, role_id) values (2, 'admin', 'admin@admin.com', '$08$KCoyc.QU7xbzX2pe31zIxOaeyZGDMUF9YqtbWAaKZsEZWmw2j9l4K', 2);
insert into users (id, name, email, password, role_id) values (3, 'super_admin', 'superadmin@superadmin.com', '$08$KCoyc.QU7xbzX2pe31zIxOaeyZGDMUF9YqtbWAaKZsEZWmw2j9l4K', 3);

