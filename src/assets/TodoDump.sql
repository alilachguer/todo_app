CREATE TABLE if not exists todos(
  id INTEGER PRIMARY KEY,
  title text,
  description text,
  type text,
  date text,
  timehour text,
  timeminute text,
  notification text
);

insert into todos(title, description, type, date, timehour, timeminute, notification)
  values('title','desc','type','date','hour','min','notif');
