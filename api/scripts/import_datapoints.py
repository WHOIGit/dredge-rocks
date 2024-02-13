import csv
import math
from dredge_core_rocks.rocks.models import *


def run():
    with open("dredge_core_rocks/rocks/imports/import_dredge2.csv") as file:
        reader = csv.reader(file)
        next(reader)  # Advance past the header

        for row in reader:
            print(row)

            try:
                dredge = Dredge.objects.get(
                    dredge_number=row[3], leg__leg_number=row[2], leg__cruise__cruise_number=row[1]
                )
            except Dredge.DoesNotExist:
                print(f"No matching Dredge - {row}")
                continue

            sample_number = ""
            sub_sample = ""
            primary_lithology = ""
            av_grain_size = ""
            texture = ""
            contact = ""
            glass = ""
            palag = ""
            comments = ""

            if row[4]:
                sample_number = row[4]

            if row[5]:
                sub_sample = row[5]

            if row[6]:
                primary_lithology = row[6]

            if row[7]:
                av_grain_size = row[7]

            if row[8]:
                texture = row[8]

            if row[9]:
                contact = row[9]

            if row[10]:
                glass = row[10]

            if row[11]:
                palag = row[11]

            if row[12]:
                comments = row[12]

            try:
                sample = Sample(
                    dredge=dredge,
                    sample_number=sample_number,
                    sub_sample=sub_sample,
                    primary_lithology=primary_lithology,
                    av_grain_size=av_grain_size,
                    texture=texture,
                    contact=contact,
                    glass=glass,
                    palag=palag,
                    comments=comments,
                )
                sample.save()
                print("saved")
            except Exception as e:
                print(e)
                continue
