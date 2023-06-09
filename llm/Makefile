.PHONY: run
run:
	venv/bin/uvicorn app:app --reload

.PHONY: install
install:
	python3 -m venv venv
	. venv/bin/activate
	venv/bin/pip install -r requirements.txt

.PHONY: clean
clean:
	rm -rf venv

.PHONY: lint-fix
lint-fix:
	venv/bin/black .
	
# .PHONY: test
# test:
# 	venv/bin/pytest -s